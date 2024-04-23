const axios = require('axios');

exports.getDog = async (req, res, next) => {
    try {
        const response = await axios.get("https://dog-api.kinduff.com/api/facts");
        const dogFact = response.data.facts;
        console.log(dogFact)

        if (!dogFact) {
            res.status(400).json({
                success: false,
                message: "Error fetching dog fact",
                errors: messages,
              });
        }

        res.render("dog", { pageTitle: "Dog Facts", path: "/dog", fact: dogFact});
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error fetching dog fact",
            errors: messages,
          });
    }
  };