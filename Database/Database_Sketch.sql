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
  "room_number" int,
  "floor" int,
  "building_name" varchar,
  "coordinate" int[],
  "room_type" room.room_type,
  "tags" varchar[],
  "accessibility" bool,
  "inside_accessibliity" bool,
  "accessible_door" int[],
  "min_stairs_needed" int,
  PRIMARY KEY ("room_number", "floor", "building_name")
);

CREATE TABLE "door" (
  "id" int,
  "location" varchar,
  "building_name" varchar,
  "accessibility" bool,
  "wheelchair_button" bool,
  PRIMARY KEY ("id", "building_name")
);

COMMENT ON COLUMN "room"."min_stairs_needed" IS 'When accessibility is false';

COMMENT ON TABLE "door" IS 'We could find a better way to identify the doors later';

ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "room" ("building_name");

CREATE TABLE "door_room" (
  "door_id" int,
  "room_accessible_door" int[],
  PRIMARY KEY ("door_id", "room_accessible_door")
);

ALTER TABLE "door_room" ADD FOREIGN KEY ("door_id") REFERENCES "door" ("id");

ALTER TABLE "door_room" ADD FOREIGN KEY ("room_accessible_door") REFERENCES "room" ("accessible_door");


ALTER TABLE "building" ADD FOREIGN KEY ("name") REFERENCES "door" ("building_name");
