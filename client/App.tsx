import * as React from 'react';
import { Component } from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

import routes from "./routes/routes";

type Props = {}
type States = {}

class App extends Component<Props, States>{
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    {routes.map(({ path, exact, component: C, ...rest }) => (
                        <Route 
                            key={path}
                            path={path}
                            exact={exact}
                            render={(props:any) => (
                                <C {...props} {...rest} />
                            )}
                        />
                    ))}
                </Switch>
            </div>
        )
    }
}

export default App;