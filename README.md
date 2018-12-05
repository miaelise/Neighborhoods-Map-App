#Neighborhood Maps Project

##Intro

Welcome to the Neighborhood Maps project for FEND project 7, built with React and using the Google Maps and FourSquare
APIs. This map shows a list of some of my favorite eateries and dessert shops in the LA area.

##Dependencies

* Google Maps
* FourSquare
* google-maps-react

##How to Use this App

First, obtain all the necessary files.

* Copy these files to your local machine
* Run `npm install`
* Run `npm start`

The app will launch in your browser. By default, all locations are shown as both map markers and list items. You can
filter the results by "eats" or "treats" depending on your preference and the list and map markers will update accordingly.
Just hover over the "filter" button to bring up the options. Clicking on any marker will activate its info window, giving you the venue name, website, and photo if available. Clicking the close button or anywhere on the map will close the window.
Also, clicking the name of any of the venues listed in the sidebar will activate its marker and bring up its info window in the map.

##Acknowledgements

Big thanks to [Ryan Wait](https://www.youtube.com/channel/UCRb4dFjhmm8RfvTgIfBtXFg/videos), [Doug Brown](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be) and the Udacity Knowledge center for helping with this
build.

##Additional Notes
Note that the default service worker is used in this app (bootstrapped with create-react-app) and so only works in production build. The current Google Maps API key will only show a development version, but feel free to replace it with your own key.
The FourSquare client and secret keys have a limited number of calls that can be made to them, so also feel free to replace
them with your own.
