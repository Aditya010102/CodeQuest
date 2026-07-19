export class StorageUtil {

    static save(key: string, value: any) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    static get(key: string) {

        const data =

            localStorage.getItem(key);

        return data ?

            JSON.parse(data)

            : null;

    }

    static remove(key: string) {

        localStorage.removeItem(key);

    }

    static clear() {

        localStorage.clear();

    }

}