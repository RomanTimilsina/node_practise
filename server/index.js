const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const dataFile = path.join(__dirname, 'data.json');

//Support POSTing form data with urlencode
app.use(express.urlencoded({extended:true}))

app.get('/poll', async (req, res) => {
  let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
  const TotalVotes = Object.values(data).reduce((total,n) => total += n,0)
  data = Object.entries(data).map(([label,votes]) => {
    return {
      label,
      percentage: (((100 * votes) / TotalVotes) || 0 ).toFixed(0)
    }
  })

  res.json(data);
})

app.post('/poll', async(req , res) => {
  const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
  data[req.body.add]++;
  await fs.writeFile(dataFile, JSON.stringify(data));
  res.end();
})

app.listen(3000, () => console.log('Server is running'));



