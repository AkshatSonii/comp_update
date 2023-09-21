const express = require("express");
const router = express.Router();
const { Competition , Ranking, User} = require("../models.js");


router.get("/competition/:name", async(req, res) => {
    const competition_name = req.params.name;

    try{
      const found_competition = await Competition.findOne({competitionName: competition_name});

      if (!found_competition) {
        return res.status(404).json({ message: 'Competition not found' });
      }

      const ranking_users = await Ranking.find({competitionId: found_competition._id}).sort({rank: 1}); 

      // found_user.sort((a,b) => a.rank - b.rank);
    
      // res.status(201).json(ranking_users);
      
      var user_s = []

      for(let i=0;i<ranking_users.length ;i++){
        const a = await User.findOne({_id : ranking_users[i].userId});
        user_s.push({name : a.username, rank : ranking_users[i].rank});
      }

      res.status(201).render("comparison" , {user_s});
    }
    catch(err){
      console.log(err);
      res.status(500).json({ message: 'Server error' })
    }
    

    // res.status(201).render("comparison");
});



router.get("/games", (req, res) => {
  res.status(200).render("game")
})

router.post("/competition", (req, res) => {
  const {
    competitionName,
    blogId,
    threshold,
    prize,
    status,
    startDate,
    endDate,
  } = req.body;

  const competition = new Competition({
    competitionName,
    blogId,
    threshold,
    prize,
    status,
    startDate,
    endDate,
  });
  competition.save((err, competition) => {
    if (err) throw err;
    res.status(201).json({ message: "competition saved", competition });
  });
});

module.exports = router;
