import fs from 'fs-extra';
import path from 'path';

interface DirectoryNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: DirectoryNode[];
}

export const buildDirectoryTree = async (dirPath: string): Promise<DirectoryNode[]> => {
    const stats = await fs.stat(dirPath);
    const node: DirectoryNode = {
    name: path.basename(dirPath),
    path: dirPath,
    type: stats.isDirectory() ? 'directory' : 'file',
    };

    if (stats.isDirectory()) {
        const files = await fs.readdir(dirPath);
        node.children = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(dirPath, file);
                const result = await buildDirectoryTree(filePath);
                return result[0];
            })
        );
    }

    return [node];
}