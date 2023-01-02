import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';

import { buttonStyles } from '../styles/button';
import colors from '../styles/colors';
import { shadows } from '../styles/shadows';
import { textStyles } from '../styles/text';
import { Priority } from '../types/Priority';
import DropDownPicker from 'react-native-dropdown-picker';

type AddTaskFormProps = {
  onSubmit: (description: string, priorityValue: number) => void;
};

const priorityValues = [
  { label: 'Low', value: Priority.Low },
  { label: 'Medium', value: Priority.Medium },
  { label: 'High', value: Priority.High },
];

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState<number | null>(null);
  const [priorityOptions, setPriorityOptions] = useState(priorityValues);
  const [hasPriorityError, setHasPriorityError] = useState(false);
  const [hasDescriptionError, setHasDescriptionError] = useState(false);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
    setHasDescriptionError(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!priorityValue) {
      setHasPriorityError(true);
    }

    if (!description) {
      setHasDescriptionError(true);
    }

    if (!priorityValue || !description) {
      return;
    }

    onSubmit(description, priorityValue);
    setDescription('');
    setPriorityValue(null);
    Keyboard.dismiss();
  }, [priorityValue, description]);

  return (
    <View>
      <Text style={styles.formTitle}>Add new task:</Text>

      <View>
        <DropDownPicker
          open={priorityOpen}
          value={priorityValue}
          items={priorityOptions}
          setOpen={setPriorityOpen}
          setValue={setPriorityValue}
          setItems={setPriorityOptions}
          onChangeValue={() => {
            setHasPriorityError(false);
          }}
          placeholder='Choose task priority...'
          style={[
            styles.priorityContainer,
            hasPriorityError && styles.priorityError,
          ]}
          placeholderStyle={styles.priorityPlaceholder}
          labelStyle={styles.priorityText}
          textStyle={styles.priorityText}
        />
      </View>
      
      <View style={styles.descriptionContainer}>
        <TextInput
          value={description}
          placeholder='Enter your task description...'
          onChangeText={handleDescriptionChange}
          autoCorrect={false}
          autoCapitalize='none'
          style={[
            styles.textInput,
            hasDescriptionError && styles.textInputError,
          ]}
        />
        <Pressable onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.icon}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    ...textStyles.paragraph,
    textAlign: 'left',
  },
  priorityContainer: {
    borderColor: 'transparent',
    marginBottom: 15,
  },
  priorityError: {
    borderColor: 'red',
  },
  priorityPlaceholder: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: colors.gray,
  },
  priorityText: {
    fontSize: 17,
    paddingHorizontal: 5,
  },
  descriptionContainer: {
    height: 50,
    marginBottom: 25,
    flexDirection: 'row',
    ...shadows,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 17,
  },
  textInputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  submit: {
    ...buttonStyles.button,
    width: 50,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 20,
    marginRight: 0,
  },
  icon: {
    ...buttonStyles.text,
  },
});
