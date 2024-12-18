import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Note, NoteSchema } from './notes/schemas/note.schema';
import { APP_PIPE } from '@nestjs/core';
import { LabelsModule } from './labels/labels.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './users/schemas/user.schema';
import { Label, LabelSchema } from './labels/schemas/label.schema';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
      { name: Label.name, schema: LabelSchema },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    LabelsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotesService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
