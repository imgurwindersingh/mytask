import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View, Image, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { Color } from '../constants/Color';
import { Font } from '../constants/Font';
import { theme } from '../core/theme';
import { ITask } from '../types/custom-type';

const TaskItem = (props: any) => {

    const { navigation } = props.props;

    const taskData = props.item;
    const index = props.index;

    return (
        <View>
            <Card key={index} containerStyle={{ padding: moderateScale(5), margin: moderateScale(5) }} >
                <View key={index}>
                    <Text style={styles.title}>{taskData.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: moderateScale(5) }}>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.taskId}>
                                Task ID
                            </Text>
                            <Text style={styles.taskIdValue}>
                                {taskData.ticketid}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.taskType}>
                                Task Type
                            </Text>
                            <Text style={styles.taskTypeValue}>
                                {taskData.tasktype}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.priority}>
                                Priority
                            </Text>
                            <Text style={styles.priorityValue}>
                                {taskData.priority}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: moderateScale(5) }}>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.createdBy}>
                                Created By
                            </Text>
                            <Text style={styles.createdByValue}>
                                {taskData.created_by}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.involved}>
                                Involved
                            </Text>
                            <Text style={styles.involvedValue}>
                                {taskData.involved}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.subtasks}>
                                Subtasks
                            </Text>
                            <Text style={styles.subtasksValue}>
                                {taskData.subtask}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: moderateScale(5) }}>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.startDate}>
                                Start Date
                            </Text>
                            <Text style={styles.startDateValue}>
                                {taskData.startdate}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.dueDate}>
                                Due Date
                            </Text>
                            <Text style={styles.dueDateValue}>
                                {taskData.enddate}
                            </Text>
                        </View>
                        <View style={{width: '33.3%'}}>
                            <Text style={styles.status}>
                                Status
                            </Text>
                            <Text style={styles.statusValue}>
                                {taskData.status}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        padding: moderateScale(5)
    },
    taskId: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    taskIdValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    },
    taskType: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    taskTypeValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    },
    priority: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    priorityValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.redColor
    },
    createdBy: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    createdByValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    },
    involved: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    involvedValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    },
    subtasks: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    subtasksValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    },
    startDate: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    startDateValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.ashColor
    },
    dueDate: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    dueDateValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.ashColor
    },
    dueTime: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    dueTimeValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.ashColor
    },
    status: {
        fontFamily: Font.fontMedium,
        fontSize: moderateScale(10),
        color: Color.ashColor
    },
    statusValue: {
        fontFamily: Font.fontBold,
        fontSize: moderateScale(11),
        color: Color.blackColor
    }
});

export default TaskItem;