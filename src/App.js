import * as React from "react";

import {
    Admin,
    EditGuesser,
    Resource,
    ListGuesser,
    EditButton,
} from "react-admin";
import { UserEdit, UserList } from "./components/Users";
import { CommunityList, CommunityEdit } from "./components/Communities";
import { PostCreate, PostEdit, PostList } from "./components/Posts";
import authProvider from "./services/auth.services";
import dataProvider from "./services/api.services";

import userIcon from "@mui/icons-material/Person";
import communityIcon from "@mui/icons-material/Group";
import tripIcon from "@mui/icons-material/TripOrigin";
import categoryIcon from "@mui/icons-material/Category";
import { TripList } from "./components/Trips";
import { CategoryEdit, CategoryList } from "./components/Categories";

const App = () => {
    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            sx={{ backgroundColor: "black" }}
        >
            <Resource
                icon={userIcon}
                name="users"
                list={UserList}
                // edit={UserEdit}
                // create={}
            />
            <Resource
                icon={communityIcon}
                name="communities"
                list={CommunityList}
                // edit={CommunityEdit}
            />
            <Resource
                icon={tripIcon}
                name="trips"
                list={TripList}
                // edit={EditGuesser}
            />
            <Resource
                icon={categoryIcon}
                name="categories"
                list={CategoryList}
                edit={CategoryEdit}
            />
            {/* <EditButton /> */}
        </Admin>
    );
};

export default App;
