import { Injectable } from '@angular/core';

import { ExercisePlan, WorkoutPlan } from './model';
import { WorkoutService } from "./workout-service";

@Injectable()
export class WorkoutBuilderService {
    buildingWorkout: any;
    newWorkout: boolean;
    firstExercise: boolean = true;

    constructor(private workoutService:WorkoutService){}

    startBuilding(name: string){
        if(name){
            this.buildingWorkout = this.workoutService.getWorkout(name)
            this.newWorkout = false;
        }else{
            let exerciseArray : ExercisePlan[] = [];
            this.buildingWorkout = new WorkoutPlan("", "", 30, exerciseArray);
            this.newWorkout = true;
        }
        return this.buildingWorkout;
    }

    removeExercise(exercise: ExercisePlan){
        var currentIndex = this.buildingWorkout.exercises.map(function(e: any) { return e.exercise.name; }).indexOf(exercise.exercise.name);
        this.buildingWorkout.exercises.splice(currentIndex, 1)
    }

    addExercise(exercisePlan: ExercisePlan){
        if(this.newWorkout && this.firstExercise){
            this.buildingWorkout.exercises.splice(0, 1);
            this.firstExercise = false;
        }
        this.buildingWorkout.exercises.push(exercisePlan);
    }

    moveExerciseTo(exercise: ExercisePlan, toIndex: number ){
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length) return;
        var currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    }

    save(){
        let workout = this.newWorkout ?
            this.workoutService.addWorkout(this.buildingWorkout) :
            this.workoutService.updateWorkout(this.buildingWorkout);
        this.newWorkout = false;
        return workout;
    }
}