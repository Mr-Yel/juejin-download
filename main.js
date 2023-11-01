import fs from "fs";
import inquirer from "inquirer";
import fse from "fs-extra";

import { getBooks, getBookInfo, getSection } from "./utils.js";

const main = async () => {
    const books = await getBooks();

    const { bookId } = await inquirer.prompt([
        {
            type: "list",
            name: "bookId",
            message: "请选择要下载的小册",
            choices: books,
        },
    ]);

    const { booklet, sections } = await getBookInfo(bookId);

    const bookName = booklet.base_info.title;

    fse.ensureDirSync(bookName);

    const [finishSections, progressSections] = sections.reduce(
        (prev, curr) => {
            if (curr.status === 1) {
                prev[0].push(curr);
            } else {
                prev[1].push(curr);
            }
            return prev;
        },
        [[], []]
    );

    console.log(
        `获取目录成功：完结 ${finishSections.length}章，写作中 ${progressSections.length}章`
    );

    for (let i = 0; i < finishSections.length; i++) {
        const section = finishSections[i];
        console.log(section.id);
        const sectionInfo = await getSection(section.id);
        // console.log(sectionInfo);
        console.log(sectionInfo.title);
        let sectionPath = `${bookName}/${section.index
            }.${sectionInfo.title}.md`;
        console.log(sectionPath);

        /* 替换斜杠 '/'  */
        let b = 0 // 用于记录第一个斜杠 '/'
        sectionPath = sectionPath.replace(/\//g, (match, offset) => {
            b++
            return (b === 1) ? match : "or"
        }); 
        /**/

        /* 替换冒号 ':'  */
        sectionPath = sectionPath.replace(/:/g, (match, offset) => {
            return '：'
        });
        /**/

        /* 替换问号 '?'  */
        sectionPath = sectionPath.replace(/\?/g, (match, offset) => {
          return '？'
        });
        /**/
        

        /* 替换引号 '"'  */
        sectionPath = sectionPath.replace(/\"|\'/g, (match, offset) => {
            return '”'
          });
          /**/

          

        /* 替换尖括号 '<'  */
        sectionPath = sectionPath.replace(/\</g, (match, offset) => {
            return '《'
          });
          /**/

        /* 替换尖括号 '>'  */
        sectionPath = sectionPath.replace(/\>/g, (match, offset) => {
            return '》'
          });
          /**/
        
        // console.log(sectionInfo.content);
        fs.writeFileSync(sectionPath, sectionInfo.content);
        console.log(`第 ${section.index} 章下载完成`);
    }

    console.log(`小册 ${bookName} 下载完成`);
};

main();
