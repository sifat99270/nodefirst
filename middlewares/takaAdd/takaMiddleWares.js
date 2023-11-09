const takaSchema = require("../../models/takaAddSchema");
const daySchema = require("../../models/daySchema");
const dateSchema = require("../../models/dateSchema");
async function takaMiddleWere(req, res) {
  try {
    const id = req.body.id;
    const mounth = req.body.mounth;
    const name = req.body.name;
    const taka = req.body.taka;
    const date = req.body.date;
    const time = req.body.time;
    if (name && taka && date && mounth && id) {
      const day = {
        id,
        mounth,
        name,
        taka,
        date,
        time,
      };
      const searchMounths = await takaSchema.findOne({
        id: req.body.id,
        mounth: req.body.mounth,
      });
      const searchDate = await dateSchema.findOne({
        id: req.body.id,
        date: req.body.date,
      });
      const dayAdd = new daySchema(day);
      const daySave = await dayAdd.save();
      if (searchDate) {
        const dateUpdate = await dateSchema.updateOne(
          {
            id,
            date,
          },
          {
            $push: {
              dates: daySave._id,
            },
          }
        );
      } else {
        const prepireDate = new dateSchema({
          id,
          date,
          dates: [daySave._id],
        });
        const dateSave = await prepireDate.save();
      }
      if (searchMounths) {
        const takaAddUpdate = await takaSchema.updateOne(
          {
            id: req.body.id,
            mounth: req.body.mounth,
          },
          {
            $push: {
              mounths: daySave._id,
            },
          }
        );
        res.status(200).json(daySave);
      } else {
        const prepire = new takaSchema({
          id: req.body.id,
          mounth: req.body.mounth,
          mounths: [daySave._id],
        });

        const save = await prepire.save();
        res.status(200).json(daySave);
      }
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "data insert fail",
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "data insert fail",
        },
      },
    });
  }
}
module.exports = takaMiddleWere;
