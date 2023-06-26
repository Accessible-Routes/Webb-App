CREATE SCHEMA "room";

CREATE TYPE "room"."room_type" AS ENUM (
  'classroom',
  'office',
  'hallway',
  'bathroom',
  'staircase',
  'lecture_hall',
  'elevator',
  'closet'
);

CREATE TABLE "building" (
  "name" int PRIMARY KEY,
  "accessibility" bool
);

CREATE TABLE "room" (
  "room_number" varchar,
  "floor" int,
  "building_name" varchar,
  "coordinate" float[][2],
  "room_type" room.room_type,
  "tags" varchar[],
  "accessibility" bool,
  "inside_accessibliity" bool,
  "accessible_door" int[],
  "min_stairs_needed" int,
  PRIMARY KEY ("room_number", "floor", "building_name")
);

CREATE TABLE "outside_door" (
  "id" varchar,
  "location" varchar,
  "building_name" varchar,
  "accessibility" bool,
  "wheelchair_button" bool,
  "coordinate" float[],
  "interior_coodinate" float[],
  PRIMARY KEY ("id", "building_name")
);

CREATE TABLE "room_door" (
  "id" int,
  "room_number" varchar,
  "floor" int,
  "building_name" varchar,
  "accessible_building_door" varchar,
  PRIMARY KEY ("id", "room_number", "floor", "building_name")
);

COMMENT ON COLUMN "room"."min_stairs_needed" IS 'When accessibility is false';

COMMENT ON TABLE "outside_door" IS 'We could find a better way to identify the doors later (building door)';

ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "room" ("building_name");

ALTER TABLE "room" ADD FOREIGN KEY ("accessible_door") REFERENCES "room_door" ("id");

ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "outside_door" ("building_name");

ALTER TABLE "room_door" ADD FOREIGN KEY ("room_number") REFERENCES "room" ("room_number");

CREATE TABLE "outside_door_room_door" (
  "outside_door_id" varchar,
  "room_door_accessible_building_door" varchar,
  PRIMARY KEY ("outside_door_id", "room_door_accessible_building_door")
);

ALTER TABLE "outside_door_room_door" ADD FOREIGN KEY ("outside_door_id") REFERENCES "outside_door" ("id");

ALTER TABLE "outside_door_room_door" ADD FOREIGN KEY ("room_door_accessible_building_door") REFERENCES "room_door" ("accessible_building_door");

