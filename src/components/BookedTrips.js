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
    ReferenceField,
    ImageField,
} from "react-admin";

export const BookedUserList = () => (
    <List>
        <Datagrid rowClick="edit">
            {/* <BooleanField source="deletedStatus" /> */}
            {/* <TextField source="username" /> */}

            <TextField source="trip" />
            <NumberField source="price" />
            <NumberField source="discount" />
            <NumberField source="net" />
            <TextField source="community" />
            <TextField source="contact" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="phoneNumber" />
            <EmailField source="email" />

            <ImageField source="profile" title="Profile" />
            <ImageField source="banner" title="Banner" />
        </Datagrid>
    </List>
);

export const BookedUserEdit = () => (
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
    return <span>Booked User {record ? `"${record.firstName}"` : ""}</span>;
};
