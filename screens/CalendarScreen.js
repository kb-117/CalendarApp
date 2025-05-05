import { Feather } from "@expo/vector-icons";
import { toEthiopian } from "ethiopian-date";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import EthiopianCalendarGrid from "../EthiopianCalendarGrid";

// Ethiopian calendar labels
const ethiopianMonths = [
  "መስከረም",
  "ጥቅምት",
  "ኅዳር",
  "ታኅሣሥ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዚያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጷጉሜን",
];
const ethiopianWeekdaysShort = ["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"];

export default function CalendarScreen() {
  // ✅ Get today's Gregorian and Ethiopian dates
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];
  const [ey, em, ed] = toEthiopian(
    today.getUTCFullYear(),
    today.getUTCMonth() + 1,
    today.getUTCDate()
  );

  // ✅ Initialize states with today's date
  const [useEthiopian, setUseEthiopian] = useState(true);
  const [selectedDate, setSelectedDate] = useState(isoToday);
  const [ethiopianDate, setEthiopianDate] = useState(
    `${ey}-${pad(em)}-${pad(ed)}`
  );
  const [ethYear, setEthYear] = useState(ey);
  const [ethMonth, setEthMonth] = useState(em);
  const [currentMonth, setCurrentMonth] = useState(today);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeSwitchCalendar = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDayPress = (day) => {
    const [year, month, date] = day.dateString.split("-").map(Number);

    const [ey, em, ed] = toEthiopian(year, month, date);

    setSelectedDate(day.dateString);
    setEthiopianDate(`${ey}-${pad(em)}-${pad(ed)}`);
  };

  const onMonthChange = (month) => {
    setCurrentMonth(new Date(month.year, month.month - 1));
  };

  const handleEthSelect = (item) => {
    const utcDate = new Date(
      Date.UTC(
        item.gregorianDate.getUTCFullYear(),
        item.gregorianDate.getUTCMonth(),
        item.gregorianDate.getUTCDate()
      )
    );

    const iso = utcDate.toISOString().split("T")[0];

    setSelectedDate(iso);
    setEthiopianDate(
      `${item.ethYear}-${pad(item.ethMonth)}-${pad(item.ethDay)}`
    );
  };

  const handleToggleCalendar = (value) => {
    fadeSwitchCalendar();
    setUseEthiopian(value);

    if (selectedDate) {
      const date = new Date(selectedDate); // ISO format
      const gy = date.getUTCFullYear();
      const gm = date.getUTCMonth() + 1;
      const gd = date.getUTCDate();

      if (value) {
        // Switching to Ethiopian: calculate eth month from selectedDate
        const [ey, em] = toEthiopian(gy, gm, gd);
        setEthYear(ey);
        setEthMonth(em);
      } else {
        // Switching to Gregorian: calculate GC month from selectedDate
        setCurrentMonth(new Date(gy, gm - 1, gd));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Ethiopian Calendar</Text>
        <Switch value={useEthiopian} onValueChange={handleToggleCalendar} />
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {useEthiopian ? (
          <>
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => {
                      if (ethMonth === 1) {
                        setEthYear(ethYear - 1);
                        setEthMonth(13);
                      } else {
                        setEthMonth(ethMonth - 1);
                      }
                    }}
                    style={styles.navArrow}
                  >
                    <Feather name="chevron-left" size={24} color="#0077cc" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>
                    {ethiopianMonths[ethMonth - 1]} {ethYear}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (ethMonth === 13) {
                        setEthYear(ethYear + 1);
                        setEthMonth(1);
                      } else {
                        setEthMonth(ethMonth + 1);
                      }
                    }}
                    style={styles.navArrow}
                  >
                    <Feather name="chevron-right" size={24} color="#0077cc" />
                  </TouchableOpacity>
                </View>
                {/* Day of week headers */}
                <View style={styles.weekDaysRow}>
                  {ethiopianWeekdaysShort.map((day) => (
                    <Text key={day} style={styles.weekDayText}>
                      {day}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridContainer}>
                <EthiopianCalendarGrid
                  year={ethYear}
                  month={ethMonth}
                  onSelect={handleEthSelect}
                  selectedDate={selectedDate}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <Calendar
              current={currentMonth.toISOString().split("T")[0]}
              onDayPress={handleDayPress}
              onMonthChange={onMonthChange}
              renderArrow={(direction) => (
                <Feather
                  name={direction === "left" ? "chevron-left" : "chevron-right"}
                  size={24}
                  color="#007AFF"
                />
              )}
              renderHeader={() => (
                <View style={styles.header}>
                  <Text style={styles.headerText}>
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              )}
              hideExtraDays={false}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#b3e5fc",
                },
              }}
              dayComponent={({ date, state }) => {
                const [ey, em, ed] = toEthiopian(
                  date.year,
                  date.month,
                  date.day
                );
                return (
                  <TouchableOpacity onPress={() => handleDayPress(date)}>
                    <View
                      style={[
                        styles.dayContainer,
                        selectedDate === date.dateString &&
                          styles.selectedDayContainer,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          selectedDate === date.dateString &&
                            styles.selectedDayText,
                          state === "disabled" && styles.fadedText,
                        ]}
                      >
                        {date.day}
                      </Text>
                      <Text style={styles.subDayText}>{ed}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        )}
      </Animated.View>

      {selectedDate && (
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>GC</Text>
              <Text style={styles.value}>{selectedDate}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>EC</Text>
              <Text style={styles.value}>{ethiopianDate}</Text>
            </View>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const pad = (n) => String(n).padStart(2, "0");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  toggleLabel: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 6,
  },
  navButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dayContainer: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 6,
  },
  selectedDayContainer: {
    backgroundColor: "#cdeffd",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  selectedDayText: {
    fontWeight: "bold",
    color: "#0077cc",
  },
  subDayText: {
    fontSize: 10,
    color: "#666",
  },
  fadedText: {
    opacity: 0.4,
  },

  navArrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    height: 24,
    width: 24,
    textAlign: "center",
    lineHeight: 24,
    color: "#007AFF",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 7,
  },
  weekDayText: {
    width: 32,
    textAlign: "center",
    fontSize: 12.33,
    marginBottom: 7,
    marginTop: 2,
    color: "#B6C1CD",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  gridContainer: {
    paddingHorizontal: 0,
  },

  rightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    paddingHorizontal: 6,
  },

  infoContainer: {
    margin: 16,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#888",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0077cc",
  },
});
