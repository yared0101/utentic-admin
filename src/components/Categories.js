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
    Create,
} from "react-admin";

export const CategoryList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <DateField source="createdDate" />
            <DateField source="updatedDate" />
        </Datagrid>
    </List>
);

export const CategoryEdit = () => (
    <Edit title={<CategoryTitle />}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

const CategoryTitle = () => {
    const record = useRecordContext();
    return <span>Category {record ? `"${record.name}"` : ""}</span>;
};
