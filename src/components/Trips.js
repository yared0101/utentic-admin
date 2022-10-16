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
    ImageField,
} from "react-admin";

export const TripList = () => (
    <List>
        <Datagrid rowClick="edit">
            {/* <TextField source="id" /> */}
            {/* <ImageField title="image" source="image" src="" /> */}
            <TextField source="name" />
            <DateField source="departure" />
            <DateField source="return" />
            <TextField source="description" />
            <TextField source="destination" />
            <NumberField source="price" />
            <TextField source="meetUpLocation" />
            <TextField source="packageIncludes" />
            <TextField source="activities" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <BooleanField source="discounted" />
            <NumberField source="discountAmount" />
            <ReferenceField source="organizerId" reference="communities">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="organizerUserId" reference="users">
                <TextField source="firstName" />
                &nbsp;
                <TextField source="lastName" />
            </ReferenceField>
            <BooleanField source="deletedStatus" />
            <DateField source="createdDate" />
            <NumberField source="_count.bookedBy" />
        </Datagrid>
    </List>
);

export const TripEdit = () => (
    <Edit title={<TripTitle />}>
        <SimpleForm>
            {/* <BooleanInput source="isAdmin" /> */}
            <TextInput source="name" />
            <TextInput source="bio" />
            <TextInput source="contactNumber" />
        </SimpleForm>
    </Edit>
);

const TripTitle = () => {
    const record = useRecordContext();
    return <span>Trip {record ? `"${record.name}"` : ""}</span>;
};
