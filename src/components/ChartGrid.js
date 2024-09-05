import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartGrid = ({ sensorData, chartConfig, page }) => {
  return (
    <View style={styles.chartGrid}>
      {sensorData.map((data, index) => (
        <View key={index} style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4'],
              datasets: [{ data }],
            }}
            width={screenWidth / 2.3}
            height={180}
            chartConfig={chartConfig}
            style={styles.chart}
          />
          <Text style={styles.sensorLabel}>Sensor {index + 1 + page * 6}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chartGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  chartContainer: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#2A2938',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#514D73',
  },
  chart: {
    borderRadius: 16,
  },
  sensorLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ChartGrid;
