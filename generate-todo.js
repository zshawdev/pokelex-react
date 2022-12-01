const fs = require("fs");
const path = require("path");

const DEFAULT_FILE_EXTS = [".ts", ".tsx", ".js", ".jsx"];
const DEFAULT_BANNED_PATHS = ["node_modules", ".git", "dist"];

const args = process.argv.slice(2);

/**
 *
 * @param {string[]} args
 */
const processArgs = (args) => {
  return [
    [...DEFAULT_FILE_EXTS],
    [...DEFAULT_BANNED_PATHS],
    ...["custom.d.ts", "server"],
  ];
};

const C_RETURN = "\r";
const LINE_BREAK = "\n";
const getLineBreakChar = (file) => {
  const indexOfLf = file.indexOf(LINE_BREAK);

  if (indexOfLf === -1) {
    if (file.indexOf(C_RETURN) !== -1) return C_RETURN;
  }

  if (indexOfLf !== -1 && file[indexOfLf - 1] === C_RETURN)
    return C_RETURN + LINE_BREAK;

  return LINE_BREAK;
};

/**
 *
 * @param {string} fileContents
 */
const findTodosInFile = (fileContents, filename) => {
  const regex = new RegExp(/\/\/(.*)TODO:\s(.*)/g);
  const matches = fileContents.match(regex);
  const lines = fileContents.split(getLineBreakChar(fileContents));
  if (Array.isArray(matches)) {
    const todos = matches.map((m) => {
      let lineNum = lines.findIndex(l => l.includes(m));
      if(lineNum === -1) lineNum === "";
      return `${filename}:${lineNum}:${m.split("TODO:")[1]}`;
    });
    return todos;
  }
  return [];
};

/**
 *
 * @param {string} filePath
 * @returns
 */
const readFile = (filePath) => {
  return {
    path: filePath,
    file: fs.readFileSync(filePath, { encoding: "utf-8" }),
  };
};

/**
 *
 * @param {string[]} extensions
 * @param {string} fileName
 * @returns {boolean}
 */
const matchExtensions = (extensions, fileName) =>
  extensions.some((extension) =>
    fileName.match(new RegExp("^(.*)" + extension + "$", "i"))
  );

/**
 *
 * @param {string[] | string} extensions
 * @param {string[]} skippedPaths
 * @param {string} directoryPath
 * @returns {string[]}
 */
const findFiles = (extensions, skippedPaths, directoryPath) => {
  if (typeof extensions === "string") extensions = [extensions];
  if (
    skippedPaths.some((path) =>
      path.match(new RegExp("^" + skippedPaths + "$"))
    )
  )
    return [];

  const files = [];
  const stats = fs.lstatSync(directoryPath);
  if (stats.isFile() && matchExtensions(extensions, directoryPath)) {
    files.push(path.join(directoryPath));
  } else if (stats.isDirectory()) {
    const directoryContents = fs.readdirSync(directoryPath);
    for (let i = 0; i < directoryContents.length; i++) {
      const contents = findFiles(
        extensions,
        skippedPaths,
        path.join(directoryPath, directoryContents[i])
      );
      files.push(contents);
    }
  }

  return files;
};

/**
 *
 * @param {string[] | string} extensions
 * @param {string[]} skippedPaths
 * @param  {...string} paths
 * @returns {{ path: string, file: string }[]}
 */
const parseMultiplePaths = (extensions, skippedPaths, ...paths) => {
  const files = paths
    .map((path) => findFiles(extensions, skippedPaths, path).flat(100))
    .flat(100);
  return files.map(readFile);
};

/**
 *
 * @param {string[] | string} extensions
 * @param {string[]} skippedPaths
 * @param  {...string} paths
 * @returns {(string | null)[]}
 */
const getTodos = (extensions, skippedPaths, ...paths) => {
  const fileNamesAndContents = parseMultiplePaths(
    extensions,
    skippedPaths,
    ...paths
  );
  return fileNamesAndContents
    .map(({ file, path }) => findTodosInFile(file, path))
    .flat(100);
};

/**
 * 
 * @param {string[]} todos 
 */
const putTodos = (todos, appendToReadme = false) => {
  if (process.platform === "win32") {
    todos = todos.map((todo) => {
      const indexOfFilenameEnd = todo.indexOf(":");
      return todo.slice(0, indexOfFilenameEnd).replace(new RegExp("\\\\", 'g'), "/") + todo.slice(indexOfFilenameEnd);
    });
  }

  todos = todos.map(todo => `- ${todo}`);

  const todosFileContents =
`# TODOS  
> Created using \`generate-todo.js\`

${todos.join("\n")}

`;

  fs.writeFileSync(path.resolve(__dirname, "TODO.md"), todosFileContents, { encoding: "utf-8" });
  if(appendToReadme) {
    const todosFileContentsReadme = `#${todosFileContents}`;
    try {
      const readmeFile = fs.readFileSync(path.resolve(__dirname, "README.md"), "utf-8");
      console.log(typeof readmeFile);
      let newReadme;
      let todosSectionIndex = readmeFile.indexOf("## TODOS"), endTodosSectionIndex;
      if(todosSectionIndex === -1) {
        // doesnt exist, insert at end
        newReadme = readmeFile + "\n" + todosFileContentsReadme + "\n";
      } else {
        endTodosSectionIndex = readmeFile.slice(todosSectionIndex).indexOf("#");
        if(endTodosSectionIndex === -1) endTodosSectionIndex = undefined;

        newReadme = readmeFile.slice(0, todosSectionIndex) + todosFileContentsReadme + endTodosSectionIndex ? readmeFile.slice(endTodosSectionIndex) : "\n";
      }

      if(newReadme && newReadme !== readmeFile) {
        fs.writeFileSync(path.resolve(__dirname, "README.md"), newReadme, "utf-8");
      }
    } catch(e) {
      console.log(e);
    }
  }
};

const [extensions, skippedPaths, ...paths] = processArgs(args);

putTodos(getTodos(extensions, skippedPaths, ...paths), true);
