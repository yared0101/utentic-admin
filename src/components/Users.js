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
    ImageField,
} from "react-admin";

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            {/* <BooleanField source="deletedStatus" /> */}
            {/* <TextField source="username" /> */}
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="phoneNumber" />
            <EmailField source="email" />
            <BooleanField source="isAdmin" />
            <DateField source="createdDate" />
            <NumberField source="_count.createdCommunities" />
            <NumberField source="_count.followedCommunities" />
            <NumberField source="_count.organizedTrips" />
            <ImageField source="profile" title="Profile" />
            <ImageField source="banner" title="Banner" />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit title={<UserTitle />}>
        <SimpleForm>
            <BooleanInput source="isAdmin" />
            <TextInput source="username" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="phoneNumber" />
            <TextInput multiline source="bio" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

const UserTitle = () => {
    const record = useRecordContext();
    return <span>User {record ? `"${record.firstName}"` : ""}</span>;
};
