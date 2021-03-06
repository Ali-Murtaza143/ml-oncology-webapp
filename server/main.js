import { Meteor } from 'meteor/meteor';
import React from 'react';
 
 
import { onPageLoad } from 'meteor/server-render';  
import  {renderRoutes}  from '../imports/startup/both/routes.jsx'
 
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { appointmentsDB } from '../imports/collections/appointmentsDB';
import { doctorDB } from '../imports/collections/doctorDB.js';
import { patientDB } from '../imports/collections/patientDB.js';
import { testDB } from '../imports/collections/testDB.js';
import { regPatient } from '../imports/collections/regPatient.js';
import { notifDB } from '../imports/collections/notifDB.js';
import { accessDB } from '../imports/collections/accessDB.js';


 
Meteor.startup(() => {

 onPageLoad(sink => {  
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={sink.request.url} context={context}>
     {renderRoutes()}
    </StaticRouter>

 );

 
  sink.renderIntoElementById("target", app);
  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
  });

  Meteor.publish('appointment', function(hid) {
    return appointmentsDB.find({hospitalID:Number(hid)},{sort:{TSappointment:-1}});
  });
 
  Meteor.publish('patients-list', function(hid) {
    return patientDB.find({hospitalID:Number(hid)});
  });

  Meteor.publish('patient-info', function(userid) {
    return regPatient.find({_id:userid});
  });

  Meteor.publish('appointment-single', function(id) {
    return appointmentsDB.find({_id:id});
  });  
  
  Meteor.publish('appointment-pid', function(id) {
    return appointmentsDB.find({patID:id});
  });

  Meteor.publish('patients-single', function(id) {
    return patientDB.find({_id:id});
  });


  Meteor.publish('doctor-userid', function(id) {
    return doctorDB.find({userID:id});
  });
 
  Meteor.publish('test-all', function(hid) {
    return testDB.find({hospitalID:hid});
  });
 
  Meteor.publish('test-single', function(pid) {
    return testDB.find({patientID:pid});
  });
 
  Meteor.publish('notif-user', function(uid) {
    return notifDB.find({userID:uid});
  });
 
  Meteor.publish('access-user', function(uid) {
    return accessDB.find({userID:uid});
  });

  Meteor.publish('doctor-all', function() {
    return doctorDB.find({});
  });

  Meteor.publish('booking-pat', function(patID) {
    return appointmentsDB.find({patID});
  });


});
