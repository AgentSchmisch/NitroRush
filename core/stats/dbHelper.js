import { Scoreboard } from "./scoreboard.js";

export class Database extends Scoreboard {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjaG1pZGZsb3JpYW4zOUBnbWFpbC5jb20iLCJkaXNwbGF5X25hbWUiOiJGbG9yaWFuIFNjaG1pZCIsImF2YXRhciI6bnVsbCwidXNlcl9uYW1lIjpudWxsLCJpZCI6InVzczBoZTJsOHN3MWt4dnMiLCJyb2xlcyI6Im9yZy1sZXZlbC12aWV3ZXIiLCJ0b2tlbl92ZXJzaW9uIjoiZDhhMjMwZDBhYjAwMWJkYTE3MGY2MWY1MWJkNWFiZDQ4Mjg0ODhmMzNiZTRjOWU4NGEzNWMzZjM1MGI0MTcyMjQ1NTdiNTEyZDI4Yzg0MGMiLCJwcm92aWRlciI6ImNvZ25pdG8iLCJpYXQiOjE3MDY3MTA2MTgsImV4cCI6MTcwNjc0NjYxOH0.OKBkidZtTbhhhs0FDzI2MNVKrZVKKW9liutRuWsWEZ0'
    writeToDatabase(name, time) {
        console.log(name, time)
        const options = {
            method: 'POST',
            headers: {
                'xc-auth': this.token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: name,
                time: time
            })
        };

        fetch('https://app.nocodb.com/api/v2/tables/mr6dl23axl1ko8a/records', options)
            .then(response => response.json())
            .then(response => { console.log(response) })
            .catch(err => console.error(err));
    }


    readFromDatabase() {
        const options = {
            method: 'GET',
            headers: {
                'xc-auth': this.token,
                "Accept": "application/json"
            }
        };

        fetch('https://app.nocodb.com/api/v2/tables/mr6dl23axl1ko8a/records?viewId=vwn1ld5b2dxlkwfe&limit=5&shuffle=0&offset=0', options)
            .then(response => response.json())
            .then(response => { this.writeToScoreBoard(response.list) })
            .catch(err => console.error(err));
    }


}
