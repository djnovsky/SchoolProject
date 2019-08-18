import { createAction, props } from '@ngrx/store';
import { Teacher } from 'src/app/models/teacher.model';

export const teacherAction = createAction(
    '[Teachers List] teachersList',
    props<{ teachersList: Array<object>}>()
);

export const addOneTeacher = createAction(
    '[Add Teacher] addTeacher',
    props<{ teacher: object}>()
);

export const editTeacher = createAction(
    '[EditTeacher] editTeacher',
    props<{ editedTeacher: Teacher }>()
);

export const sortColumn = createAction(
    '[SortColumn] sortColumn',
    props<{ sortOptions: object}>()
);

