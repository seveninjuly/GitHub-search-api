'use strict';

function getUserResults() {
    const userInput = $('#username').val();
    console.log(userInput);
    fetch(`https://api.github.com/users/${userInput}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('No username matched, please try again!'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.hidden').show();
    $('.result').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.result').append(`<ul>
        <li>${responseJson[i].name}: <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></li>
        </ul>`)
    };
    console.log('works!');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        getUserResults();
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    $('.hidden').hide();
    watchForm();
});

