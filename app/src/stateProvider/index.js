'use strict';

/* StateProvider Congifs */
import homeState from './home/home';
import weeklyTasksState from './weeklyTasks/weeklyTasks';
import weeklyTasksDayState from './weeklyTasks/day/day';

export default function($stateProvider) {
  $stateProvider
    .state('mainPage', homeState )
    .state('weeklyTasks',weeklyTasksState)
    .state('weeklyTasks.day', weeklyTasksDayState);
}
