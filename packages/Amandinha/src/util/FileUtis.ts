/* eslint-disable @typescript-eslint/type-annotation-spacing */ // O preetier manda ficar separado, e o eslint junto, por isso que desabilitei pra não me estressar
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-cycle
import WatchClient from '../client';

type ReloadFunction<Module> = (module: Module, dirPath: string) => void;

export default class FileUtil {
  static filename(filepath: string): string {
    return path.parse(filepath).name;
  }

  static async readDirectory<B>(
    directory: string,
    client: WatchClient,
    callback: ReloadFunction<B> = () => null
  ): Promise<unknown[]> {
    return Promise.all(
      FileUtil.readdirRecursive(directory).map(async filepath => {
        const fullpath = path.resolve(filepath);
        const Module = (await import(fullpath)).default;
        // @ts-ignore
        callback(new Module(client), filepath);
      })
    );
  }

  static readdirRecursive(directory: string): string[] {
    return fs.readdirSync(directory).reduce((p, file) => {
      const filepath = path.join(directory, file);
      if (fs.statSync(filepath).isDirectory()) {
        return [...p, ...FileUtil.readdirRecursive(filepath)];
      }
      return [...p, filepath];
    }, []);
  }
}
