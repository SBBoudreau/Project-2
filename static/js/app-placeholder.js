d3.select('#buttonId').on('click', function () {
    d3.json('myGamerLocationUrlHere').then(data, function (data) {
        country = data.location.Country
        d3.select('#locationInput').value(country)


        // do stuff in here




        // then....
        d3.select('#choiceForm')
    })
})