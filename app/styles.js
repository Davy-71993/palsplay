import { StyleSheet } from "react-native"

export const colors = (theme = 'light') => {
    const slate_100 = '#f1f5f9'
    const slate_200 = '#e2e8f0'
    const slate_300 = '#cbd5e1'
    const slate_700 = '#334155'
    const slate_800 = '#1e293b'
    const slate_900 = '#0f172a'

    const primary = theme === 'light' ? slate_100 : slate_900
    const secondary = theme === 'light' ? slate_200 : slate_800
    const inner = theme === 'light' ? slate_300 : slate_700
    const text = theme === 'light' ? slate_800 : slate_200
    const cls = {
        primary,
        secondary,
        text,
        inner,
        blue: '#6366f1',
        slate_100
    }

    return cls
}

export const styleSheet = (theme = 'light') => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors(theme).primary,
    },

    content: {},

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    h1:{
        fontSize: 32,
        textAlign: 'center',
        width: '100%',
        color: colors(theme).text,
        fontWeight: '300'
    },

    h2: {
        fontSize: 26,
        textAlign: 'center',
        width: '100%',
        color: colors(theme).text,
        fontWeight: '200'
    },

    stackHeader: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: colors(theme).primary,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.2,
        elevation: 4,
    },

    text: {
        color: colors(theme).text
    }

})