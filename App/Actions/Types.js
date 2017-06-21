// @flow

import { createTypes } from 'reduxsauce';

export default createTypes(`
  LOGIN_REQUEST
  LOGIN_SUCCESS
  LOGIN_FAILURE

  ACTIVITIES_REQUEST
  ACTIVITIES_SUCCESS
  ACTIVITIES_FAILURE

  ACTIVITY_REQUEST
  ACTIVITY_SUCCESS
  ACTIVITY_FAILURE

  SET_ACT_USER_REQUEST
  SET_ACT_USER_SUCCESS
  SET_ACT_USER_FAILURE

  RESOURCES_REQUEST
  RESOURCES_SUCCESS
  RESOURCES_FAILURE

  NEWSES_REQUEST
  NEWSES_SUCCESS
  NEWSES_FAILURE

  STARTUP
`);
