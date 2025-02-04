import { isHostComponentElementType } from "core/pulp/pulpHelpers";
import { HostComponentPulp } from "core/pulp/HostComponentPulp";
import { LayoutComponentPulp } from "components/Layout/LayoutComponentPulp";
import React from "react";
import { ComponentPulp } from "index-core";

export function freezeColumnWidth(header: HostComponentPulp | undefined): HostComponentPulp | undefined {
    if (!header?.rendered?.length)
        return header;

    const headerChildren: HostComponentPulp[] = [];
    for (const row of header.rendered) {
        if (!isHostComponentElementType('tr')(row) || !row?.rendered?.length) {
            continue;
        }

        const rowChildren: HostComponentPulp[] = [];
        for (const head of row.rendered) {
            if (isHostComponentElementType('th')(head)) {

                if (head.props?.style?.width) {
                    rowChildren.push(head);
                }
                else {
                    rowChildren.push(head.clone({
                        props: {
                            ...head.props,
                            style: {
                                ...head.props.style,
                                width: head.domNode.getBoundingClientRect().width + 'px'
                            }
                        },
                    }));
                }
            }
        }

        headerChildren.push(row.clone({ rendered: rowChildren }));
    }

    return header.clone({ rendered: headerChildren });
}

export function makeRowsUnbreakable(body: HostComponentPulp): HostComponentPulp {
    if (!body?.rendered?.length)
        return body;

    const bodyChildren: ComponentPulp[] = [];
    for (const row of body.rendered) {
        if (!isHostComponentElementType('tr')(row) || !row?.rendered?.length) {
            continue;
        }

        bodyChildren.push(new LayoutComponentPulp(React.Fragment, { key: row.props.key, children: row.component }, [row], null, null, { disableWrap: true }));
    }

    return body.clone({ rendered: bodyChildren });
}