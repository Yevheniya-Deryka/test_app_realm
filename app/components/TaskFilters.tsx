import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import { textStyles } from "../styles/text";
import { Sort } from "../types/Sort";
import { Status } from "../types/Status";

type TaskFiltersProps = {
  selectedStatus: Status;
  onStatusSelect: (value: Status) => void;
  onSortChange: (value: Sort) => void;
}

const sortValues = [
  { label: 'New first', value: Sort.NewFirst },
  { label: 'High priority first', value: Sort.HighPriorityFirst },
  { label: 'Low priority first', value: Sort.LowPriorityFirst },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  selectedStatus,
  onStatusSelect,
  onSortChange
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState<Sort>(Sort.NewFirst);
  const [sortOptions, setSortOptions] = useState(sortValues);

  return (
    <View>
      <View style={styles.statusContainer}>
        <Pressable
          onPress={() => onStatusSelect(Status.ALL)}
          style={[
            styles.statusButton,
            (selectedStatus === Status.ALL) && styles.statusButtonActive
          ]}
        >
          <Text style={styles.statusButtonText}>All</Text>
        </Pressable>

        <Pressable
          onPress={() => onStatusSelect(Status.ACTIVE)}
          style={[
            styles.statusButton,
            (selectedStatus === Status.ACTIVE) && styles.statusButtonActive
          ]}
        >
          <Text style={styles.statusButtonText}>Active</Text>
        </Pressable>
        
        <Pressable
          onPress={() => onStatusSelect(Status.COMPLETED)}
          style={[
            styles.statusButton,
            (selectedStatus === Status.COMPLETED) && styles.statusButtonActive
          ]}
        >
          <Text style={styles.statusButtonText}>Completed</Text>
        </Pressable>
      </View>

      <View>
        <DropDownPicker
          open={sortOpen}
          value={sortValue}
          items={sortOptions}
          setOpen={setSortOpen}
          setValue={setSortValue}
          setItems={setSortOptions}
          onChangeValue={(value: Sort) => {
            onSortChange(value);
          }}
          style={styles.sortContainer}
          labelStyle={styles.sortText}
          textStyle={styles.sortText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersTitle: {
    ...textStyles.paragraph,
    textAlign: 'left',
  },
  statusContainer: {
    height: 40,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadows,
  },
  statusButton: {
    ...buttonStyles.button,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    width: 100,
    height: '100%',
  },
  statusButtonActive: {
    backgroundColor: colors.purpleDark,
  },
  statusButtonText: {
    ...buttonStyles.text,
  },
  sortContainer: {
    borderColor: 'transparent',
    marginBottom: 15,
  },
  sortText: {
    fontSize: 17,
    paddingHorizontal: 5,
  },
});
