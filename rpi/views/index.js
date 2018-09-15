// Configs
let config=require("config");
let widgetTypes=config.get("widgetTypes");
let data=require("../data/data.json");

// Global libraries and assets
const moment=require(`moment`);
const fs=require(`fs`);
const jQuery=$=require("../../node_modules/jquery/dist/jquery.min.js");
const load=require("../js/resourceLoader.js");
const request=require(`request`);
require(`howler`);
load(`global.css`);
load(`../js/jquery.animateCss.js`);
load(`../../node_modules/animate.css/animate.min.css`);
load(`../../node_modules/font-awesome/css/font-awesome.min.css`);
load(`../../node_modules/jquery-ui-dist/jquery-ui.min.js`);
load(`../../node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js`);

// Electron integration 
const electron=require("electron");
const main=electron.remote.require("./server.js");
let ipcRenderer=electron.ipcRenderer;

// Main theming
load(`index.css`);
load(`theme-${data.theme}.css`);

$(document).ready(function(){
    console.log("Hi! Welcome to Pi Guardian.");
    $.when(
        $.get("splash.html",function(data){$("body").append(data)}),
        $.get("dashboard.html",function(data){$("body").append(data)}),
        $.get("notification.html",function(data){$("body").append(data)}),
        $.get("keypad.html",function(data){$("body").append(data)}),
        $.get("clock.html",function(data){$("body").append(data)})
    ).done(function(){
        runSplash(function(){
            initDashboard(function(){
                console.log("Dashboard initialized.");
                endSplash(revealDashboard);
            });
        });
    });
});
