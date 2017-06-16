import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Rx';

describe('VoterService', () => {
    let mockHttp;
    let voterService: VoterService;
    
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['post', 'delete']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {

        it('should remove the voter from list of the voters', () => {
            var session = {id: 6, voters: ["joe", "john"]};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        })

        it('should call htt.delete with the right URL', () => {
            var session = {id: 6, voters: ["joe", "john"]};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
        })
    })

    describe('addVoter', () => {

        it('should call http.post with the right URL', () => {
            var session = {id: 6, voters: ["joe", "john"]};
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(3, <ISession>session, "joe");

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', "{}", jasmine.any(Object));
        })
    })
})