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
            <MyImageField source="image" />
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

const MyImageField = ({ source }) => {
    const record = useRecordContext();
    if (record) {
        return (
            <ul style={{ display: "flex", gap: "10px" }}>
                {record[source].map((elem) => (
                    <li>
                        <img src={elem} height="100" />
                    </li>
                ))}
            </ul>
        );
    } else {
        return null;
    }
    // return record ? <a href={record[source]}>{record[source]}</a> : null;
};
