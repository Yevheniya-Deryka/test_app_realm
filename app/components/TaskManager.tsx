import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { textStyles } from '../styles/text';

import { Task } from '../models/Task';
import { TaskRealmContext } from '../models';
import { AddTaskForm } from './AddTaskForm';
import TaskList from './TaskList';

type TaskManagerProps = {
  tasks: Realm.Results<Task & Realm.Object>;
  userId?: string;
}

const { useRealm } = TaskRealmContext;

export const TaskManager: React.FC<TaskManagerProps> = ({ tasks, userId }) => {
  const realm = useRealm();

  const handleAddTask = useCallback(
    (description: string, priority: number): void => {
      if (!description) {
        return;
      }

      realm.write(() => {
        return new Task(realm, description, priority, userId);
      });
    },
    [realm, userId]
  );

  const handleToggleTaskStatus = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });
    },
    [realm]
  );

  const handleDeleteTask = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm]
  );

  return (
    <View style={styles.managerContainer}>
      <AddTaskForm onSubmit={handleAddTask} />
      {tasks.length === 0 ? (
        <Text style={styles.paragraph}>You have no tasks yet</Text>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleTaskStatus={handleToggleTaskStatus}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  managerContainer: {
    flex: 1,
  },
  paragraph: {
    ...textStyles.paragraph,
  },
});
