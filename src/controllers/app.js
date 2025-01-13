const express = require("express");
const AppService = require("../services/app");

exports.homeRoute = (req, res) => {
    try {
        let homeResp = AppService.homeRoute();
        res.json(homeResp);
    } catch (err) {
        res.json("An error occurred");
    }
}