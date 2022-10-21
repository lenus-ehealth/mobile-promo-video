const ffmpeg = require('fluent-ffmpeg');
const fsExtra = require('fs-extra');
const fs = require('fs');

type Something = {
  videoPath: string;
  folder: string;
  duration: number;
  second: number;
};

const getFileName = (videoPath:string) => videoPath.split('.mov')[0];

const removeFolder = async (path:string) => {
  try {
    await fsExtra.remove(path)
    console.log('')
    console.log(`Removed folder: '${path}'`)
  } catch (err) {
    console.error(err)
    throw new Error(`error removing folder ${path}`);
  }
}


/** Renaming files from 0_0-30 to 1.png, 2.png... */
const renameAndMoveFiles = (videoPath: string) => {
  const videoFileName = getFileName(videoPath)
  fs.readdir(videoFileName, async (err: any, files: string[]) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }    
    await removeFolder(`src/Welcome/${videoFileName}`);

    const filesArray = files
      .map((file) => {
        const [seconds, frames] = file.split('.png')[0].split('_');
        const fileOrder = parseInt(seconds) * 30 + parseInt(frames);

        return { fileOrder, fileName: file };
      })
      .filter(({ fileOrder }) => Boolean(fileOrder));

    const sorted = filesArray.sort((a, b) => a.fileOrder - b.fileOrder);

    const folder = `${videoFileName}`

    sorted.forEach(async ({ fileName, fileOrder }) => {
      try {
        await fsExtra.move(`${folder}/${fileName}`, `src/Welcome/${videoFileName}/${fileOrder}.png`);
        // console.log(`success moving ${fileName} to ${fileOrder}.png`);
      } catch (err) {
        console.error(err);
      }
    });
  });
};

export const MockDuck = () => {
  const getVideoDuration = (pathToVideo: string) => {
    return new Promise<number>((resolve, _reject) => {
      ffmpeg.ffprobe(pathToVideo, (_err: any, metadata: any) => {
        const duration = metadata?.streams[0]?.duration;
        resolve(duration);
      });
    });
  };

  const saveScreenShotForSecond = async (props: Pick<Something, 'videoPath' | 'second'>) => {
    const { videoPath, second } = props;
    const secondValue = second.toString().padStart(2, '0');
    const videoFileName = getFileName(videoPath)

    const folderPath = `${videoFileName}`

    return new Promise((resolve, _reject) => {
      ffmpeg(videoPath)
        .seekInput(`00:00:${secondValue}`)
        .screenshots({
          filename: `${folderPath}/${second}.png`,
          timestamps: [
            `00:00:${secondValue}.000`,
            `00:00:${secondValue}.033`,
            `00:00:${secondValue}.066`,
            `00:00:${secondValue}.099`,
            `00:00:${secondValue}.132`,
            `00:00:${secondValue}.165`,
            `00:00:${secondValue}.198`,
            `00:00:${secondValue}.231`,
            `00:00:${secondValue}.264`,
            `00:00:${secondValue}.297`,
            `00:00:${secondValue}.330`,
            `00:00:${secondValue}.363`,
            `00:00:${secondValue}.396`,
            `00:00:${secondValue}.429`,
            `00:00:${secondValue}.462`,
            `00:00:${secondValue}.495`,
            `00:00:${secondValue}.528`,
            `00:00:${secondValue}.561`,
            `00:00:${secondValue}.594`,
            `00:00:${secondValue}.627`,
            `00:00:${secondValue}.660`,
            `00:00:${secondValue}.693`,
            `00:00:${secondValue}.726`,
            `00:00:${secondValue}.759`,
            `00:00:${secondValue}.792`,
            `00:00:${secondValue}.825`,
            `00:00:${secondValue}.858`,
            `00:00:${secondValue}.891`,
            `00:00:${secondValue}.924`,
            `00:00:${secondValue}.957`,
          ],
        })
        .on('end', () => {
          resolve(null);
        });
    });
  };

  const extractScreenshotsFromVideo = async (props: Pick<Something, 'duration' | 'videoPath'>) => {
    const { videoPath, duration } = props;

    const seconds = Math.round(duration) + 2;
    const screenshotPromises = Array.from({ length: seconds }).map(
      async (_, i) =>
        await saveScreenShotForSecond({
          videoPath,
          second: i,
        }),
    );

    await Promise.all(screenshotPromises);
  };

  const videoToScreenshots = async (props: Pick<Something, 'videoPath'>) => {
    const { videoPath } = props;
    const duration = await getVideoDuration(videoPath);

    const videoFileName = getFileName(videoPath)
    const folderPath = `${videoFileName}`
    // await removeFolder(folderPath)
    await fsExtra.ensureDir(folderPath)

    await extractScreenshotsFromVideo({
      videoPath,
      duration,
    });

    
    console.log('')
    console.log('')
    console.log({videoFileName})
    renameAndMoveFiles(videoPath);

    console.log('----------------------------------------------------------------');
    console.log('');
    console.log(`[videoToScreenshots DONE]: "${videoPath}"`);
  };

  const run = async () => {
    // TODO: do this for all files
    const files = [
      'chat.mov',
      'groups.mov',
      'meals.mov',
      'workout.mov',
    ]

    console.log('')
    console.log('----------------------------------------------------------------')
    console.log('[START] videoToScreenshots')

    
    // const promises = files.map(filePath => videoToScreenshots({
    //   videoPath: filePath
    // }))
    // const promises = files.map(filePath => mockDuck.videoToScreenshots({
    //   videoPath: filePath
    // }))

    // await Promise.all(promises);

    await videoToScreenshots({
      videoPath: 'chat.mov'
    })

    await videoToScreenshots({
      videoPath: 'groups.mov'
    })

    await videoToScreenshots({
      videoPath: 'meals.mov'
    })

    await videoToScreenshots({
      videoPath: 'workout.mov'
    })

    console.log('')
    console.log('----------------------------------------------------------------')
    console.log('[DONE] videoToScreenshots')
  }

  return {
    videoToScreenshots,
    run
  };
};

const run = () => {
  const mockDuck = MockDuck();
  mockDuck.run();
};

run();