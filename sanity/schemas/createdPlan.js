export default{
    name: 'createdPlan',
    title: 'Created plan for selected day',
    type: 'document',
    fields:[
        {
            name:'planName',
            title:'Plan name',
            type: 'string'
        },
        {
            name:'description',
            title:'Plan description',
            type: 'string'
        },
        {
            name:'state',
            title:'Plan state',
            type: 'boolean'
        },
        {
            name:'dayPlan',
            title:'Day Plan',
            description:'Selected day',
            type:'reference',
            to:{
                type:'dayPlan'
            }
        }

    ]
}