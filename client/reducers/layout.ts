let initLayout = {
    collapsed: true,
    defaultOpenKeys: [],
    selectedKeys: []
}

export const layout = (state = initLayout, action: any): typeof initLayout => {
    switch (action.type) {
        default:
            return state;
    }
}