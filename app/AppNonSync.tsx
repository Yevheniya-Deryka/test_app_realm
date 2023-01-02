import React, { useCallback, useMemo, useState } from 'react';

import { Task } from './models/Task';
import { TaskRealmContext } from './models';
import { TaskManager } from './components/TaskManager';
import { StyleSheet, View } from 'react-native';
import { TaskFilters } from './components/TaskFilters';
import { Status } from './types/Status';
import { Sort } from './types/Sort';

const { useQuery } = TaskRealmContext;

const getFilteredAndSortedTasks = (
  result: Realm.Results<Task & Realm.Object>,
  status: Status,
  sort: Sort
): Realm.Results<Task & Realm.Object> => {
  let tasks: Realm.Results<Task & Realm.Object>;

  switch (status) {
    case Status.COMPLETED: 
      tasks = result.filtered('isComplete == true');
      break;
    case Status.ACTIVE:
      tasks = result.filtered('isComplete != true');
      break;
    default:
      tasks = result;
  }

  switch (sort) {
    case Sort.HighPriorityFirst:
      return tasks.sorted('priority');
    case Sort.LowPriorityFirst: 
      return tasks.sorted('priority', true);
    default:
      return tasks.sorted('createdAt');
  }
};

export const AppNonSync = () => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.ALL);
  const [sort, setSort] = useState<Sort>(Sort.NewFirst);

  const handleStatusSelection = useCallback((status: Status) => {
    setSelectedStatus(status);
  }, []);

  const handleSortChange = useCallback((value: Sort) => {
    setSort(value);
  }, []);

  const result = useQuery(Task);

  const tasksToShow = useMemo(() => getFilteredAndSortedTasks(
    result,
    selectedStatus,
    sort,
  ), [result, selectedStatus, sort]);

  return (
    <View style={styles.appContainer}>
      <TaskManager tasks={tasksToShow} />
      <TaskFilters
        selectedStatus={selectedStatus}
        onStatusSelect={handleStatusSelection}
        onSortChange={handleSortChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
