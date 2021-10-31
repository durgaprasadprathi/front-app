export const generatePalette = (components: any) => {
    let _components: any = [];
    let _properties: any = []
    let key = 1;
    // console.log(components)
    components && components.forEach((p: any, i: any) => {

        let _singleDropdown = {
            name: p.name,
            children: <any>[]
        }

        if (p.children && p.children.length > 0) {
            p.children.forEach((c: any) => {
                let _length = c.properties ? c.properties.length : 0;
                let round = (_length + 1) / 4;
                // console.log(c.properties)
                let _dotsArr: any = [[], [], [], []];
                for (let initRound = 0; initRound < _length + 1; initRound++) {
                    if (initRound === _length) {
                        _dotsArr[initRound % 4].push({ "portColor": "green", "portTitle": "connection", "portId": "port-" + key + "-" + initRound + "-" + "connection" })
                    }
                    else if (initRound === 0) {
                        _dotsArr[initRound % 4].push({ "portColor": "red", "portTitle": c.properties[initRound].name, "portId": "port-" + key + "-" + initRound + "-" + c.properties[initRound].name, componentKey: key })
                    }
                    else {
                        _dotsArr[initRound % 4].push({ "portColor": "red", "portTitle": c.properties[initRound].name, "portId": "port-" + key + "-" + initRound + "-" + c.properties[initRound].name })
                    }
                }
                _properties.push({
                    name: c.name,
                    properties: c.properties,
                })

                let _singleComponent = {
                    key: key++, name: c.name, figure: "RoundedRectangle",
                    otherName:"",
                    "size": "100 auto",
                    fill: "lightgray",
                    "leftArray": _dotsArr[0],
                    "topArray": _dotsArr[1],
                    "bottomArray": _dotsArr[2],
                    "rightArray": _dotsArr[3],
                    visible: true,
                    componentId: c.id

                }
                _singleDropdown.children.push(_singleComponent)
            })
        }
        // _singleDropdown.children.push({
        //     key: 99, name: "Group", figure: "RoundedRectangle",
        //     "size": "100 auto",
        //     fill: "lightgray",
        //     visible: true,
        //     componentId:12,
        //     isGroup: true,
        // })
        _components.push(_singleDropdown);
    })

    // console.log(_components, _properties)
    return {
        components: _components,
        properties: _properties
    };
}

