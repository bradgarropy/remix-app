import type {Errors} from "~/utils/errors"

type DataResponse = {
    data: {
        errors: Errors
    }
}

export type {DataResponse}
