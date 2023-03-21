import path from "path";
import fs from "fs/promises";
import { glob } from "glob";
import SVGSpriter from "svg-sprite"

try {
    await fs.rm("build", {
        recursive: true
    });
} catch {

}

// Copy public files
const publics = await glob("**", {
    cwd: `${process.cwd()}/public`,
    nodir: true
});
for (const publicFile of publics) {
    await fs.mkdir(`build/${path.dirname(publicFile)}`, { recursive: true });
    await fs.cp(`public/${publicFile}`, `build/${publicFile}`);
}

const visited = [];
const icons = await glob("**/*.svg");

const spriter = SVGSpriter({
    dest: "build",
    mode: {
        symbol: true
    }
});
for (const icon of icons) {
    const iconName = path.basename(icon);
    if (visited.includes(iconName)) continue;

    try {
        spriter.add(iconName, null, await fs.readFile(icon));
        visited.push(iconName);
    } catch {
        // Skip over any icons that can't be read (broken symlink?)
    }
}

const { result } = await spriter.compileAsync();
for (const mode in result) {
    for (const resource in result[mode]) {
        await fs.mkdir(path.dirname(result[mode][resource].path), { recursive: true });
        await fs.writeFile(result[mode][resource].path, result[mode][resource].contents);

        console.log(`Generated ${result[mode][resource].path}`);
    }
}