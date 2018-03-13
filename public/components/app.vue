<template>
    <mdc-layout-app>
        <mdc-toolbar slot="toolbar">
            <mdc-toolbar-row>
                <mdc-toolbar-section align-start>
                    <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
                    <mdc-toolbar-title>Spending PWA</mdc-toolbar-title>
                </mdc-toolbar-section>
            </mdc-toolbar-row>
        </mdc-toolbar>
        <mdc-drawer slot="drawer" toggle-on="toggle-drawer" toolbar-spacer>
            <mdc-drawer-list>
                <mdc-drawer-item start-icon="add" to="/new">New Transaction</mdc-drawer-item>
                <mdc-drawer-item start-icon="list" to="/transactions">Transactions</mdc-drawer-item>
            </mdc-drawer-list>
        </mdc-drawer>
        <router-view></router-view>
    </mdc-layout-app>
</template>

<script>
export default {}
</script>
