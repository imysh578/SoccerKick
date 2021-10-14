const express = require("express");
const url = require("url");
//const { CommunityPost, Sequelize, User } = require("../models");
const Sequelize = require("sequelize");
const Teams = require("../models/teams");
const Users = require("../models/users");
const Mercenary_boards = require("../models/mercenary_boards");
const Battle_boards = require("../models/battle_boards");
const Op = Sequelize.Op; // LIKE

const router = express.Router();

/* 검색 기능 */
//---------------------구단리스트
router.get('/', async (req, res, next) => {
    try {
      let queryData = url.parse(req.url, true).query;   //파싱해주기? 콘솔:[Object: null prototype] { q: '*****' }
      let q = queryData.q;  //검색어 추출 q는 ?이후의 q 콘솔:***** q는 input의 name에서 정한다.
      let select = queryData.select;    //?
  
      /* 제목/내용 검색 */
      const teamS = await Teams.findAll({
        where: {
        [Op.or]: [{
            team_name : {               // 탐색해볼 테이블들.
              [Op.like]: "%" + q + "%"  //내가입력한 값을 유사검색하는 op.like
            }
          }, {
            team_leaderId : {
              [Op.like]: "%" + q + "%"
            }
          },
            {
            team_area : {
              [Op.like]: "%" + q + "%"
            }
          },
        ]
        },
        order: [['team_name', 'DESC']],
      });
      //---------------------용병
      const merceS = await Mercenary_boards.findAll({
        where: {
        [Op.or]: [{
            mercenary_board_title : {               // 탐색해볼 테이블들.
              [Op.like]: "%" + q + "%"  //내가입력한 값을 유사검색하는 op.like
            }
          }, {
            mercenary_select : {
              [Op.like]: "%" + q + "%"
            }
          },
            {
              mercenary_board_content : {
              [Op.like]: "%" + q + "%"
            }
          },
        ]
        },
        order: [['mercenary_select', 'DESC']],
      });
      //console.log(merceS)

      //---------------------배틀
      const battleS = await Battle_boards.findAll({
        where: {
        [Op.or]: [{
            battle_board_teamName : {               // 탐색해볼 테이블들.
              [Op.like]: "%" + q + "%"  //내가입력한 값을 유사검색하는 op.like
            }
          }, {
            battle_board_area : {
              [Op.like]: "%" + q + "%"
            }
          },
            {
            battle_board_title : {
              [Op.like]: "%" + q + "%"
            }
          },
        ]
        },
        order: [['battle_board_title', 'DESC']],
      });
     // console.log(battleS)
    console.log(typeof q)
  
    //   /* 내용 검색 */
    //   const contents = await Teams.findAll({
    //     include: { 
    //       model: Users,
    //       attribute: ['team_name', 'team_leaderId'],
    //     },
    //     where: {
    //       content : {
    //         [Op.like]: "%" + search + "%"
    //       },
    //     },
    //     order: [['team_name', 'DESC']],
    //   });
  
    //   /* 제목 검색 */
    //   const titles = await CommunityPost.findAll({
    //     include: { 
    //       model: User,
    //       attribute: ['id', 'nick'],
    //     },
    //     where: {
    //       title : {
    //         [Op.like]: "%" + search + "%"
    //       },
    //     },
    //     order: [['id', 'DESC']],
    //   });
  
    //   /* 작성자 검색 */
    //   const users = await CommunityPost.findAll({
    //     include: { 
    //       model: User,
    //       attribute: ['id', 'nick'],
    //       where: {
    //         nick : {
    //           [Op.like]: "%" + search + "%"
    //         },
    //       }
    //     },
    //     order: [['id', 'DESC']],
    //   });
  
    //  if (select == 'titleContent') {
    //    texts = titleContents;
    //  } //else if (select == 'content') {
    //     texts = contents;
    //   } else if (select == 'title') {
    //     texts = titles;
    //   } else {
    //     texts = users;
    //   }
  
      res.render('search_result', {
       teams: teamS,
       merces: merceS,
       battles: battleS
       

      });
    } catch (error) {
      console.error(error);
      next(error);
    };
  });
  
  module.exports = router;