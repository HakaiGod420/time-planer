export default {
    name: 'dayPlan',
    title: 'Day Plan',
    type: 'document',
    fields:[
        {
            name:'goalDescription',
            title: 'Description of goal',
            type: 'string',
        },
        {
            name:'selectedDate',
            title:'Selected Day Goal',
            type: 'date'
        }
    ]
}