import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Realm } from '@realm/react';

import colors from '../styles/colors';

import { Task } from '../models/Task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Realm.Results<Task & Realm.Object>;
  onToggleTaskStatus: (task: Task & Realm.Object) => void;
  onDeleteTask: (task: Task & Realm.Object) => void;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTaskStatus,
  onDeleteTask,
}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={task => task._id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleStatus={() => onToggleTaskStatus(item)}
            onDelete={() => onDeleteTask(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.white,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default TaskList;
