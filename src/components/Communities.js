import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    DateField,
    NumberField,
    TextInput,
    BooleanInput,
    Edit,
    SimpleForm,
    useRecordContext,
    ArrayField,
    SingleFieldList,
    ChipField,
    ReferenceField,
} from "react-admin";

export const CommunityList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />

            <TextField source="bio" />
            <TextField source="contactNumber" />
            <DateField source="createdDate" />

            {/* <TextField source="bankAccounts" /> */}
            {/* <ArrayField source="bankAccounts" /> */}
            <ReferenceField source="creatorId" reference="users">
                <TextField source="firstName" />
                &nbsp;
                <TextField source="lastName" />
            </ReferenceField>
            <ArrayField source="bankAccounts">
                {/* <SingleFieldList>
                    <ChipField source="number" />
                    <ChipField source="name" />
                </SingleFieldList> */}
                <Datagrid>
                    <NumberField source="number" />
                    <TextField source="name" />
                </Datagrid>
            </ArrayField>
            {/* <NumberField source="_count.managers" /> */}
            <NumberField source="_count.organizedTrips" />
            <NumberField source="_count.followers" />
        </Datagrid>
    </List>
);

export const CommunityEdit = () => (
    <Edit title={<CommunitiesTitle />}>
        <SimpleForm>
            {/* <BooleanInput source="isAdmin" /> */}
            <TextInput source="name" />
            <TextInput source="bio" />
            <TextInput source="contactNumber" />
        </SimpleForm>
    </Edit>
);

const CommunitiesTitle = () => {
    const record = useRecordContext();
    return <span>Community {record ? `"${record.name}"` : ""}</span>;
};
