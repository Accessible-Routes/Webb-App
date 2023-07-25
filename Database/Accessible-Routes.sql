CREATE SCHEMA "room";

CREATE SCHEMA "door";

CREATE TYPE "room"."room_type" AS ENUM (
  'Classroom',
  'Office',
  'Hallway',
  'Bathroom(M)',
  'Bathroom(W)',
  'Bathroom(N)',
  'Stairs',
  'Lecture_Hall',
  'Elevator',
  'Closet',
  'Lab'
);

CREATE TYPE "door"."direction" AS ENUM (
  'in',
  'out',
  'in_n_out'
);

CREATE TABLE "building" (
  "name" varchar PRIMARY KEY,
  "accessible" bool
);

CREATE TABLE "room" (
  "floor" int,
  "room_number" varchar,
  "room_type" room.room_type,
  "door_coordinate" float[2],
  "accessible_door" bool,
  "inside_accessibility" bool,
  "room_name" varchar[],
  "building_name" varchar,
  "tags" varchar[],
  "min_stairs_needed" int,
  PRIMARY KEY ("room_number", "building_name","door_coordinate")
);

CREATE TABLE "entrance" (
  "id" varchar,
  "location" varchar,
  "building_name" varchar,
  "accessible" bool,
  "wheelchair_button" bool,
  "coordinate" float[],
  "interior_coodinate" float[],
  "direction" door.direction,
  PRIMARY KEY ("id", "building_name")
);

CREATE TABLE "floor" (
  "building_name" varchar,
  "floor_index" int,
  "path" float[][][2],
  "floor_entrance" float[][2]
  PRIMARY KEY ("building_name", "floor_index")
);

COMMENT ON COLUMN "room"."min_stairs_needed" IS 'When accessibility is false';

COMMENT ON TABLE "entrance" IS 'We could find a better way to identify the doors later (building door)';

COMMENT ON COLUMN "room_door"."room_number" IS 'if this door is in the hallway, then leave it blank';

ALTER TABLE "floor" ADD FOREIGN KEY ("floor_index") REFERENCES "room" ("floor");

ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "room" ("building_name");

ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "entrance" ("building_name");

ALTER TABLE "room_door" ADD FOREIGN KEY ("room_number") REFERENCES "room" ("room_number");

ALTER TABLE "floor" ADD FOREIGN KEY ("floor_index") REFERENCES "room_door" ("floor");

CREATE TABLE "entrance_room_door" (
  "entrance_id" varchar,
  "room_door_accessible_building_door" varchar,
  PRIMARY KEY ("entrance_id", "room_door_accessible_building_door")
);

ALTER TABLE "entrance_room_door" ADD FOREIGN KEY ("entrance_id") REFERENCES "entrance" ("id");

ALTER TABLE "entrance_room_door" ADD FOREIGN KEY ("room_door_accessible_building_door") REFERENCES "room_door" ("accessible_building_door");


ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "floor" ("building_name");


