import React from "react";
export default function HeaderCalendar({
  month,
  year,
  onMonthChange,
  onYearChange,
  onSelect,
}) {
  const handlePrevMonth = () => {
    if (month === 1) {
      onYearChange(year - 1);
      onMonthChange(13);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 13) {
      onYearChange(year + 1);
      onMonthChange(1);
    } else {
      onMonthChange(month + 1);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePrevMonth}>
        <Text style={styles.arrow}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.monthYear}>
        {`${ethiopianMonths[month - 1]} ${year}`}
      </Text>
      <TouchableOpacity onPress={handleNextMonth}>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10, // Matches header padding
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around", // Match header spacing
    marginVertical: 2,
  },
  flexCell: {
    flex: 1,
    alignItems: "center", // Center inside flexible cell
  },
  dayContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  subDayText: {
    fontSize: 10,
    color: "#666",
  },
  fadedText: {
    opacity: 0.4,
  },
});
